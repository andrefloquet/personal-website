import Image from 'next/image';
import bookmark from '@/../public/images/bookmark.svg'

export default function GalleryItem({src, alt, title, subtitle}) {
    return (
        <div className="group relative items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <Image src={src} alt={alt} className="h-44 w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 p-3 px-4 text-white 
                    duration-300 bg-slate-900/75 opacity-0 group-hover:opacity-100"
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