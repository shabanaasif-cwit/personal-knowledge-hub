function OrganizeNotes() {
  return (
    <div className="bg-white rounded-xl p-6 w-[280px] text-center shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer">
      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div className="text-4xl">📚</div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">
        Organize Notes
      </h3>

      {/* Description */}
      <p className="mt-1 text-sm text-gray-600">
        Categorize and store your knowledge
      </p>
    </div>
  );
}

export default OrganizeNotes;
