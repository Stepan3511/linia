import { Module } from '@nestjs/common'
import { FileStoriesService } from './file-stories.service'
import { FileStoriesController } from './file-stories.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: `/uploads`
		})
	],
	controllers: [FileStoriesController],
	providers: [FileStoriesService]
})
export class FileStoriesModule {}
