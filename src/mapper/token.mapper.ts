import { TokenDTO } from "../dto/token.dto"
import { Token } from "../model/token.model";

export class TokenMapper {
    static mapToDto(token: Token | null): TokenDTO | null {
        if (token === null) return null;
        return {
            token: token.token,
        }
    }

    static mapAllToDto(tokens: Token[]): TokenDTO[] {
        return tokens.map(token => {
            return  {
                token: token.token,
            }
        })
    }

}