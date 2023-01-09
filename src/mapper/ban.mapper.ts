import { BanDTO } from "../dto/ban.dto"
import { Ban } from "../model/ban.model";

export class BanMapper {
    static mapToDto(ban: Ban | null): BanDTO | null {
        if (ban === null) return null;
        return {
            ban_date: ban.ban_date,
            ban_reason: ban.ban_reason,
        }
    }

    static mapAllToDto(bans: Ban[]): BanDTO[] {
        return bans.map(ban => {
            return  {
                ban_date: ban.ban_date,
                ban_reason: ban.ban_reason,
            }
        })
    }

}