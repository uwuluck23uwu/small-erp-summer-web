export default function LoadingImageSlider() {
    return (
        <div className="animate-pulse h-[150px] bg-gray-100 duration-500 rounded-t-[10px]" >
            <div className="h-full absolute w-full bg-gray-200 rounded-t-[10px]">
                <div className="flex justify-center items-end h-full gap-x-3 w-full pb-2">
                    <div className="w-14 h-3 bg-gray-100 rounded-[5px]"></div>
                    <div className="cursor-pointer bg-gray-100 h-3 w-3 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}