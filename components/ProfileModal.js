const ProfileModal = ({ title, content, setState, onClickFunc }) => {
  return (
    <div className="fixed left-0 top-0 z-[1000] flex size-full items-center justify-center bg-black/50">
      <div className="flex h-40 w-72 flex-col justify-between rounded-lg bg-white p-5 text-center tracking-tighter">
        <div className="flex grow flex-col justify-center whitespace-pre-line text-center">
          <h3 className="font-bold">{title}</h3>
          <p className="mt-2 text-sm">{content}</p>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setState(false)}
            className="w-1/2 text-gray-400"
          >
            취소
          </button>
          <button
            onClick={() => {
              onClickFunc();
              setState(false);
            }}
            className="ml-auto w-1/2 text-[#8728FF]"
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
