import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@nextui-org/react";
import Image from 'next/image'
export default function App() {

    const content = (
        <PopoverContent className="w-[240px]">
            {(titleProps) => (
                <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-foreground" {...titleProps}>
                        Dimensions
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full">
                        <Input defaultValue="100%" label="Width" size="sm" variant="bordered" />
                        <Input defaultValue="300px" label="Max. width" size="sm" variant="bordered" />
                        <Input defaultValue="24px" label="Height" size="sm" variant="bordered" />
                        <Input defaultValue="30px" label="Max. height" size="sm" variant="bordered" />
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