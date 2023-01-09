import { BackgroundDTO } from "../dto/background.dto"
import { Background } from "../model/background.model";

export class BackgroundMapper {
    static mapToDto(background: Background | null): BackgroundDTO | null {
        if (background === null) return null;
        return {
            background_id: background.background_id,
        }
    }

    static mapAllToDto(backgrounds: Background[]): BackgroundDTO[] {
        return backgrounds.map(background => {
            return  {
                background_id: background.background_id,
            }
        })
    }

}