


export default function DeleteEvent({ onClose, onConfirm , loading}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      
      <div className="
        w-full
        max-w-md
        sm:max-w-lg
        md:max-w-xl
        lg:max-w-md
        bg-white
        rounded-xl
        p-6
        shadow-xl
      ">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
          Delete Event
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Are you sure you want to delete this event?  
          This action cannot be undone.
        </p>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
              {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

    </div>
  );
}
