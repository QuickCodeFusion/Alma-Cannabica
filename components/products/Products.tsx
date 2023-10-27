import Cards from "../cards/Cards"
import Filters from "../filters/Filter"
import style from './products.module.css'

const Products = () => {

    return (
        <div className={style.container}>
            <div>
                <Filters/>
            </div>
            <div className={style.cards}>
                <Cards />
            </div>
        </div>
    )
}

export default Products
