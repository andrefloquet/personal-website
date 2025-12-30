import Image from 'next/image';
import bookmark from '@/../public/images/bookmark.svg'

export default function GalleryItem({src, alt, title, subtitle}) {
    return (
        <div className="relative group items-center justify-center">
            <Image 
                src={src}
                alt={alt} 
                className="w-72"
            />
            <div className="absolute bottom-4 left-0 right-0 p-2 px-4 text-white 
                    duration-500 bg-black opacity-0 group-hover:opacity-80 bg-opacity-20"
            >
                <div className="flex justify-between w-full">
                    <div className="font-normal">
                        <p className="text-sm">{title}</p>
                        <p className="text-xs">{subtitle}</p>
                    </div>
                    <div className="flex items-center">
                        <Image 
                            src={bookmark}
                            alt="Bookmark image"
                            className="fill"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}