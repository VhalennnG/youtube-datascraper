export default function Loading() {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900 via-neutral-800 to-rose-900 w-full'>
      <div className='animate-spin h-12 w-12 border-t-4 border-pink-600 rounded-full' />
    </div>
  );
}
