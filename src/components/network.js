import GalleryItem from '@/components/gallery-item';
import CardContainer from '@/components/card-container';

// images
import cisco from '@/../public/images/cisco.png'
import juniper from '@/../public/images/juniper.png'

export default function Network() {
    return (
        <section className="max-w-9/10 mx-auto my-10">
            <h2 className="text-center text-4xl mb-16 md:text-left">Network</h2>
            <CardContainer>

                    <GalleryItem 
                        src={cisco} 
                        alt="Picture of Cisco Solutions." 
                        title="Cisco" 
                        subtitle="Cisco Solutions"
                    />      

                    <GalleryItem 
                        src={juniper} 
                        alt="Picture of Juniper Networks." 
                        title="Juniper" 
                        subtitle="Juniper Networks"
                    />                                                    

                </CardContainer>                                                        
        </section>
    )
}