import React from 'react';
import { Card, CardHeader, CardBody, Image, CardFooter, Button } from '@nextui-org/react'; // Make sure to import Input from the correct package
import picture1 from '../images/holly-mandarich-UVyOfX3v0Ls-unsplash.jpg';
import picture2 from '../images/joel-jasmin-forestbird-znoL1m6MD_k-unsplash.jpg';
import picture3 from '../images/tobias-tullius-PJgtd5q-E00-unsplash.jpg';

const Images = () => {
  const cardData = [
    {
      title: 'Daily Mix',
      description: '12 Tracks',
      subtitle: 'Frontend Radio',
      src: picture1
    },
    {
        title: 'Daily Mix',
        description: '12 Tracks',
        subtitle: 'Frontend Radio',
        src: picture2
    },
    {
        title: 'Daily Mix',
        description: '12 Tracks',
        subtitle: 'Frontend Radio',
        src: picture3
    },
  ];

  return (
    <div style={{display:"flex", flexDirection: "row"}}>
      {cardData.map((data, index) => (
        <div style={{width: 300, margin: 10}}>
            <Card isFooterBlurred={false} key={index} className="py-4 mb-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{data.title}</p>
                    <small className="text-default-500">{data.description}</small>
                    <h4 className="font-bold text-large">{data.subtitle}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={data.src}
                    />
                </CardBody> 
            </Card>
        </div>
      ))}
    </div>
  );
};

export default Images;
