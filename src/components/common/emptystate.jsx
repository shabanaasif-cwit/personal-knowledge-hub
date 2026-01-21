function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h2>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;