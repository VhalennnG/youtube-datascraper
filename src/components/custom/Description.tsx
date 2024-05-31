import { MdDescription } from "react-icons/md";

interface DescriptionProps {
  text: string | null;
}

export default function Description({ text }: Readonly<DescriptionProps>) {
  return (
    <div className='flex rounded-lg h-full bg-gradient-to-t from-slate-500 to-slate-900 p-8 flex-col'>
      <div className='flex items-center mb-3'>
        <div className='w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-rose-900 text-white flex-shrink-0'>
          <MdDescription />
        </div>
        <h2 className='text-slate-50 text-lg font-bold'>Video Description</h2>
      </div>
      <div className='flex-grow mt-4 rounded-md bg-neutral-900 p-4 scrollable-description break-words md:mb-4'>
        <div
          className='leading-relaxed md:text-base text-sm whitespace-pre-wrap text-slate-50 mb-4'
          dangerouslySetInnerHTML={{
            __html: text ?? "Description on this video is not allowed",
          }}
        />
      </div>
    </div>
  );
}
