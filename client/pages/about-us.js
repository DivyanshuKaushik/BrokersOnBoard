import Image from "next/image";
import React from "react";
import img from '../public/1.jpeg'

export default function AboutUs() {
    return (
        <section id="about-us" className="py-8 px-8 lg:px-20">
            <div className="">
                <h2 className="text-3xl text-[#404040] font-bold text-center">
                    Our Mission Is To FindHouse
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                {/* about us texts  */}
                <div className="p-4 text-gray-800 space-y-4">
                    <p className="font-semibold">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio, facere. Quibusdam, excepturi quo est ad nobis
                    </p>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio, facere. Quibusdam, excepturi quo est ad nobis
                        voluptatum architecto laudantium modi dignissimos
                        voluptatem placeat maxime.
                    </p>
                    <p className="text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Inventore, ipsam? Voluptas itaque iusto rerum magnam hic
                        voluptate animi ducimus atque, inventore, delectus et
                        dolorum dicta ea quis illum nisi neque aperiam
                        accusantium explicabo eum cum rem reiciendis ab porro.
                        Repudiandae et alias ipsam quaerat eum veniam labore
                        quas aperiam recusandae dolorem, minima cum reiciendis,
                        quo voluptas facilis veritatis ipsum? Non corrupti
                        architecto, ea quibusdam culpa aliquid doloremque
                        dolorem voluptates magni possimus commodi dicta
                        doloribus nulla odit. Cumque dolorem similique
                        voluptates natus, explicabo porro tenetur quod nesciunt
                        quaerat accusamus laudantium. Tempore voluptas
                        praesentium delectus cumque aspernatur dicta autem
                        placeat. Provident, soluta.
                    </p>
                </div>
                {/* image  */}
                <div className="relative p-4 h-[300px] lg:h-full">
                    <Image src={img} fill className="rounded-md object-contain" alt="about" />
                </div>
            </div>
        </section>
    );
}
