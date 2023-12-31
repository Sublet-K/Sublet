import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { writeFile } from 'fs/promises';
import {
  PostCreateDto,
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
} from '@/dto/post.dto';
import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import { UserInterface } from '@/interface/user.interface';
import { createHash } from 'crypto';

@Injectable()
export class PostService {
  constructor(private readonly db: MongodbService) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  // GET /POST
  async getAllPosts(query: PostGetAllQueryDto) {
    console.log('[post.service:getAllPosts] starting function');
    console.log('[post.service:getAllPosts] query: ', query);

    query.maxPost = this.isPositiveInt(query.maxPost, 6);
    if (query.maxPost > 50) query.maxPost = 6;
    console.log('[post.service:getAllPosts] query.maxPost: ', query.maxPost);

    query.page = this.isPositiveInt(query.page, 1);
    console.log('[post.service:getAllPosts] query.page: ', query.page);

    const result = await this.db.getAllPosts(query);
    console.log('[post.service:getAllPosts] result: ', result);

    const ret = result.map((post) => this.transformExport(post));
    console.log('[post.service:getAllPosts] returning function');
    return ret;
  }

  // POST /POST
  async createPost(
    files: Express.Multer.File[],
    post: PostCreateDto,
    user: UserInterface,
  ) {
    console.log('[post.service:createPost] starting function');
    console.log('[post.service:createPost] files: ', files);
    console.log('[post.service:createPost] post: ', post);
    console.log('[post.service:createPost] user: ', user);

    post['end_day'] = new Date(post['end_day']);
    post['start_day'] = new Date(post['start_day']);
    console.log(
      `[post.service:createPost] post['start_day'] = ${post['start_day']}, post['end_day'] = ${post['end_day']}`,
    );

    const image_id: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.uploadImage(file);
      console.log('[post.service:createPost] res: ', res);
      image_id.push(res.id);
    }
    console.log('[post.service:createPost] image_id: ', image_id);

    // PrismaPostCreateDto 형식에 맞도록 변경하여 createPost에 전달
    const res: PostInterface = await this.db.createPost(
      {
        ...post,
        image_id,
      },
      user,
    );
    console.log('[post.service:createPost] res: ', res);
    const ret = this.transformExport(res);
    console.log('[post.service:createPost] returning function');
    return ret;
  }

  // GET /POST/:postKey
  async getOnePost(key: number) {
    console.log('[post.service:getOnePost] starting function');
    console.log('[post.service:getOnePost] key: ', key);
    const res = await this.db.getOnePost(key);
    console.log('[post.service:getOnePost] res: ', res);
    const ret = this.transformExport(res);
    console.log('[post.service:getOnePost] returning function');
    return ret;
  }

  // PUT /POST/:postKey
  async putOnePost(
    key: number,
    files: Express.Multer.File[],
    postUpdateInput: PostUpdateDto,
  ) {
    console.log('[post.service:putOnePost] starting function');
    console.log('[post.service:putOnePost] key: ', key);
    console.log('[post.service:putOnePost] files: ', files);
    console.log('[post.service:putOnePost] postUpdateInput: ', postUpdateInput);
    postUpdateInput['end_day'] &&= new Date(postUpdateInput['end_day']);
    postUpdateInput['start_day'] &&= new Date(postUpdateInput['start_day']);
    console.log(
      `[post.service:putOnePost] postUpdateInput['start_day'] = ${postUpdateInput['start_day']}, postUpdateInput['end_day'] = ${postUpdateInput['end_day']}`,
    );

    const image_id: string[] = [];
    for (const file of files) {
      // 파일들을 하나씩 업로드 하고 그 id를 저장
      const res = await this.findOrUploadImage(file);
      console.log('[post.service:putOnePost] res: ', res);
      image_id.push(res.id);
    }
    postUpdateInput.image_id = image_id;
    console.log(
      '[post.service:putOnePost] postUpdateInput.image_id = image_id: ',
      image_id,
    );

    const res = await this.db.putOnePost(key, postUpdateInput);
    console.log('[post.service:putOnePost] res: ', res);
    const ret = this.transformExport(res);
    console.log('[post.service:putOnePost] returning function');
    return ret;
  }

  // DELETE /POST/:postKey
  async deleteOnePost(key: number, user: UserInterface) {
    console.log('[post.service:deleteOnePost] starting function');
    console.log('[post.service:deleteOnePost] key: ', key);
    console.log('[post.service:deleteOnePost] user: ', user);
    const res = await this.db.deleteOnePost(key, user);
    console.log('[post.service:deleteOnePost] returning function');
    return res;
  }

  async filterPost(query: PostFilterQueryDto) {
    console.log('[post.service:filterPost] starting function');
    console.log('[post.service:filterPost] query: ', query);
    const res = await this.db.filterPost(query);
    console.log('[post.service:filterPost] res: ', res);

    const ret = res.map((post) => this.transformExport(post));
    console.log('[post.service:filterPost] returning function');
    return ret;
  }

  calculateHash(buffer: Buffer) {
    const hash = createHash('sha256');
    hash.update(buffer);
    const res = hash.digest('hex');
    return res;
  }

  async findOrUploadImage(file: Express.Multer.File) {
    console.log('[post.service:findOrUploadImage] starting function');
    console.log('[post.service:findOrUploadImage] file: ', file);
    const image_hash = this.calculateHash(file.buffer);
    console.log('[post.service:findOrUploadImage] image_hash: ', image_hash);
    try {
      const res = await this.db.getImage(
        file.originalname,
        file.mimetype,
        image_hash,
      );
      console.log('[post.service:findOrUploadImage] returning function');
      return res;
    } catch (e) {
      console.log('[post.service:findOrUploadImage] getImage failed');
      const res = await this.uploadImage(file);
      console.log('[post.service:findOrUploadImage] returning function');
      return res;
    }
  }

  async uploadImage(file: Express.Multer.File) {
    console.log('[post.service:uploadImage] starting function');
    console.log('[post.service:uploadImage] file: ', file);

    if (!file || file.mimetype !== 'image/jpeg') {
      console.log(
        '[post.service:uploadImage] file not exist or mimetype is not image/jpeg',
      );
      throw new Error(
        '[post.service:uploadImage] file not exist or mimetype is not image/jpeg',
      );
    }
    const image_hash = this.calculateHash(file.buffer);
    console.log('[post.service:uploadImage] image_hash: ', image_hash);
    const res = await this.db.saveImage(
      file.originalname,
      file.mimetype,
      image_hash,
    );
    console.log('[post.service:uploadImage] res: ', res);
    const bytes = file.buffer;
    const buffer = Buffer.from(bytes);
    await writeFile(`./public/${res.id}.jpg`, buffer);
    console.log('[post.service:uploadImage] returning function');
    return res;
  }

  transformExport(post: PostInterface): PostExportInterface {
    delete (post as { id?: string }).id;
    delete (post as { deleted?: boolean }).deleted;
    delete (post as { version?: number }).version;
    return post;
  }
}
