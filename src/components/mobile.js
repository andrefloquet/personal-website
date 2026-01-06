import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import reactnative from '@/../public/images/reactnative.png'


export default function Mobile() {
    return (
        <section className="max-w-9/10 mx-auto my-10">
            <h2 className="text-center text-4xl mb-8 md:text-left">Mobile</h2>   
            <CardContainer>

                <GalleryItem 
                    src={reactnative} 
                    alt="Picture of React Native Framework." 
                    title="React Native" 
                    subtitle="React Native Framework"
                />                                     

            </CardContainer>         

            <p className="text-center my-8 md:text-left">This app was made with React Native and nativewind to proof my mobile development skills. It was intended to be a resume app and to be on app stores(IOS and Android) for downloading, but I got this answer from apple store: "Apps on the App Store should be intended for public distribution. Apps designed only to demonstrate, showcase, or upsell an app concept or service are not appropriate." so that it can not be for public distribution, because of its usefullness for users. I am showing it here anyway to prove that I can develop apps. It replicates this website design and concept.</p>
            
            <div className="flex justify-center max-w-sm mx-auto h-120 my-10 md:h-140">
                <iframe
                    className="inset-0 h-full"
                    src="https://www.youtube-nocookie.com/embed/wHXtX37XEa8"
                    title="My app resume"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>                      
        </section>
    )
}