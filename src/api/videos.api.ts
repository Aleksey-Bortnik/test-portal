import { Video } from "src/types/video.type";

class VideosApi {
    private readonly BASE_URL = 'http://localhost:3001'
    async list(): Promise<Video[]> {
        const response = await fetch(`${this.BASE_URL}/items`);
        const data = await response.json();
        return data
    }

    async post(body: Video): Promise<void> {
        await fetch(`${this.BASE_URL}/items`, { method: 'POST', body: JSON.stringify(body) })
    }

    async getById(id: string): Promise<Video> {
        const response = await fetch(`${this.BASE_URL}/items?id=${id}`)
        const data = await response.json()
        return data[0]
    }
}

export default new VideosApi()