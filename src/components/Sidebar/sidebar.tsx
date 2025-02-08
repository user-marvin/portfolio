import Image from "next/image";
import yin from '@/assets/img/0B2A7CA6-0528-4C43-90BB-CA1674434975.jpeg'
const Sidebar: React.FC = () => {
    return (
      <div className="main-container col-span-2 h-[90vh]">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-3 mb-6">
            <Image src={yin} alt="My image" height={150} />
          </div>
          <h1 className="text-2xl font-bold mb-4">Marvin Villamar</h1>
          <h2 className="text-sm bg-gray-700 rounded-md p-1 pl-4 pr-4">
            Full Stack Developer
          </h2>
        </div>
        <div className="bg-[white] h-[0.5px] w-[90%] mt-8 mx-auto"></div>
      </div>
    );
}

export default Sidebar;