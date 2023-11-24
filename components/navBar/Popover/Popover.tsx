import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@nextui-org/react";
import Image from 'next/image'
import Cart from "@/components/cart/Cart";
export const PopoverComponent = () => {

    const content = (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-foreground" {...titleProps}>
                        Carrito de compras
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full max-h-96">
                        <Cart/>
                    </div>
                </div>
            )}
        </PopoverContent>
    )

    return (
        <div className="flex flex-wrap gap-4">

            <Popover
                showArrow
                offset={10}
                placement="bottom"
                backdrop="blur"
            >
                <PopoverTrigger>
                    <Button size="sm" isIconOnly className="bg-white border">
                        <Image src="/carrito.png" alt="" width={18} height={18} />
                    </Button>
                </PopoverTrigger>
                {content}
            </Popover>

        </div>
    );
}