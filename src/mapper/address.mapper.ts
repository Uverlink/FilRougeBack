import { AddressDTO } from "../dto/address.dto"
import { Address } from "../model/address.model";

export class AddressMapper {
    static mapToDto(address: Address | null): AddressDTO | null {
        if (address === null) return null;
        return {
            address_number: address.address_number,
            street_name: address.street_name,
            zip_code: address.zip_code,
        }
    }

    static mapAllToDto(addresss: Address[]): AddressDTO[] {
        return addresss.map(address => {
            return  {
                address_number: address.address_number,
                street_name: address.street_name,
                zip_code: address.zip_code,
            }
        })
    }

}