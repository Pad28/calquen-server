// Third-party imports
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Local imports
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';

@Injectable()
export class CompanyService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.safePrismaCall(this.prisma.company.create({
      data: createCompanyDto as any
    }));
  }

  /**
   * Crear un nuevo cliente (usuario + empresa)
   * Este método crea un usuario con rol CLIENT y una empresa asociada
   */
  async createClient(createClientDto: CreateClientDto) {
    // Verificar que el email no exista
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: createClientDto.email }
    });

    if (existingUserByEmail) {
      throw new BadRequestException('El email ya está registrado');
    }

    // Verificar que el RUT del usuario no exista
    const existingUserByRut = await this.prisma.user.findUnique({
      where: { rut: createClientDto.userRut }
    });

    if (existingUserByRut) {
      throw new BadRequestException('El RUT del usuario ya está registrado');
    }

    // Obtener el rol de CLIENT
    const clientRole = await this.prisma.role.findFirst({
      where: { role_name: 'CLIENT' }
    });

    if (!clientRole) {
      throw new NotFoundException('No se encontró el rol de cliente en el sistema');
    }

    // Generar contraseña temporal si no se proporciona
    const temporaryPassword = createClientDto.password || this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    // Crear usuario y empresa en una transacción
    return this.prisma.safePrismaCall(
      this.prisma.$transaction(async (prisma) => {
        // 1. Crear el usuario
        const user = await prisma.user.create({
          data: {
            email: createClientDto.email,
            password: hashedPassword,
            rut: createClientDto.userRut,
            first_name: createClientDto.firstName,
            last_name: createClientDto.lastName,
            phone: createClientDto.userPhone,
            role_id: clientRole.id,
            is_active: true,
          },
          include: {
            role: true,
          }
        });

        // 2. Crear la empresa vinculada al usuario
        const company = await prisma.company.create({
          data: {
            name: createClientDto.companyName,
            business_sector: createClientDto.businessSector,
            url: createClientDto.website || '',
            billing_frequency: createClientDto.billingFrequency,
            user_id: user.id,
            is_active: true,
          }
        });

        // 3. Retornar ambos objetos
        return {
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            rut: user.rut,
            phone: user.phone,
            role: user.role,
          },
          company: {
            id: company.id,
            name: company.name,
            business_sector: company.business_sector,
            url: company.url,
            billing_frequency: company.billing_frequency,
          },
          temporaryPassword: createClientDto.password ? undefined : temporaryPassword,
          message: 'Cliente creado exitosamente'
        };
      })
    );
  }

  /**
   * Generar una contraseña temporal aleatoria
   */
  private generateTemporaryPassword(): string {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions = {
      id: true,
      name: true,
      business_sector: true,
      url: true,
      billing_frequency: true,
      is_active: true,
      created_at: true,
      updated_at: true,
      _count: {
        select: {
          client_request: true,
          company_employee: true,
          employee_requests: true,
          rh_document: true
        }
      }
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.company,
      selectOptions,
      paginationDto,
      '/company',
      this.prisma
    );
  }

  /**
   * Obtener lista de clientes (empresas con usuarios de rol CLIENT)
   * con información detallada para el dashboard de administración
   */
  async findAllClients(paginationDto: PaginationDto, search?: string) {
    const where: any = {
      user: {
        role: {
          role_name: 'CLIENT'
        },
        is_active: true,
      },
      is_active: true,
    };

    // Agregar búsqueda si se proporciona
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { user: { first_name: { contains: search, mode: 'insensitive' } } },
        { user: { last_name: { contains: search, mode: 'insensitive' } } },
        { user: { rut: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const selectOptions = {
      id: true,
      name: true,
      business_sector: true,
      url: true,
      billing_frequency: true,
      is_active: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          rut: true,
          phone: true,
          role: {
            select: {
              id: true,
              name: true,
              role_name: true,
            }
          }
        }
      },
      _count: {
        select: {
          client_request: true,
          company_employee: true,
          employee_requests: true,
          rh_document: true
        }
      }
    };

    // Usar el método paginate personalizado con where
    const { limit = 10, page = 1 } = paginationDto;

    const findManyQuery = (params: any) =>
      this.prisma.company.findMany({
        ...params,
        where,
        select: selectOptions,
      });

    const countQuery = () => this.prisma.company.count({ where });

    return PaginationHelper.paginate(
      findManyQuery,
      countQuery,
      { limit, page },
      '/company/clients',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            client_request: true,
            company_employee: true,
            employee_requests: true,
            rh_document: true
          }
        }
      }
    }));
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.safePrismaCall(this.prisma.company.update({ where: { id }, data: updateCompanyDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.company.update({ where: { id }, data: { is_active: false } }));
  }
}
