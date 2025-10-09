// Third-party imports
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

// Local imports
import { DocumentCategoryService } from './document-category.service';
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('document-category')
export class DocumentCategoryController {
    constructor(private readonly documentCategoryService: DocumentCategoryService) { }

    @Post()
    create(@Body() createDocumentCategoryDto: CreateDocumentCategoryDto) {
        return this.documentCategoryService.create(createDocumentCategoryDto);
    }

    @Get()
    async findAll(
        @Query() paginationDto: PaginationDto
    ) {
        return this.documentCategoryService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.documentCategoryService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateDocumentCategoryDto: UpdateDocumentCategoryDto
    ) {
        return this.documentCategoryService.update(id, updateDocumentCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.documentCategoryService.remove(id);
    }
}

