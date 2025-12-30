import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import reactnative from '@/../public/images/reactnative.png'


export default function Mobile() {
    return (
        <section className="max-w-9/10 mx-auto my-10">
            <h2 className="text-center text-4xl mb-16 md:text-left">Mobile</h2>
            <CardContainer>

                    <GalleryItem 
                        src={reactnative} 
                        alt="Picture of React Native Framework." 
                        title="React Native" 
                        subtitle="React Native Framework"
                    />                                     

                </CardContainer>                                                        
        </section>
    )
}