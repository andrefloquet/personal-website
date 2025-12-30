import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import aws from '@/../public/images/aws.png'

export default function DevOps() {
    return (
        <section className="max-w-9/10 mx-auto my-20">
            <h2 className="text-center text-4xl mb-16 md:text-left">DevOps</h2>
            <CardContainer>

                    <GalleryItem 
                        src={aws} 
                        alt="Picture of AWS." 
                        title="AWS" 
                        subtitle="Amazon Web Services"
                    />

                </CardContainer>                                                        
        </section>
    )
}