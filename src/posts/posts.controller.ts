import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from "@nestjs/common";
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthService } from "../auth/auth.service";

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService, private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    createPostDto.AuthorUid = request['userId']
    const user = await this.authService.findOne(request['userId'])
    // createPostDto.Author =
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
