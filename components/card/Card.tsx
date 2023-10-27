import { Image } from "@nextui-org/react"

const Card = ({product}) => {
    const {name, price, description, image, category} = product
    
    return (
        <div>
            <div>
                <Image src="logo.png"/>
                <h1>{name}</h1>
                <p>{price}</p>
                <p>{category}</p>
            </div>

        </div>
    )
}

export default Card
