// Third-party imports
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { CompanyService } from './company.service';

// Local imports
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  /**
   * POST /company/client
   * Crear un nuevo cliente (usuario + empresa)
   */
  @Post('client')
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.companyService.createClient(createClientDto);
  }

  /**
   * GET /company/clients
   * Obtener lista de clientes con información detallada
   */
  @Get('clients')
  async findAllClients(
    @Query() paginationDto: PaginationDto,
    @Query('search') search?: string
  ) {
    return this.companyService.findAllClients(paginationDto, search);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.companyService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.companyService.remove(id);
  }
}
