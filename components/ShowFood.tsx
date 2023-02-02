import { FC } from "react";

interface Food {
    id: number;
    name: string;
    img: string;
    link: string;
}
const ShowFood: FC<Food> = ({ id, name, img, link }) => {
    return (
        <div className='border border-zinc-200 rounded-lg p-3 shadow-md shadow-orange-200'>
            <div>{name}</div>
            <img className='w-64 rounded border-2 border-zinc-200' src={img} alt="" />
        </div>
    )
}

export default ShowFood