/**
 * A reusable UI component for empty screens.
 * Props:
 * - icon: The emoji or SVG to display at the top.
 * - title: The main heading.
 * - description: The sub-text explaining why the screen is empty.
 * - action: A button or link (passed as a JSX element) to help the user get started.
 */
function EmptyState({ icon, title, description, action }) { // Destructures props for easy access
  return (
    // MAIN CONTAINER: Centered flexbox layout with vertical spacing (py-12)
    <div className="flex flex-col items-center justify-center py-12 px-4">
      
      {/* ICON AREA: Displays the passed icon/emoji. 
          'opacity-50' gives it a subtle, faded look so it doesn't distract from the text. */}
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      
      {/* TITLE: Large, bold heading. 'text-center' ensures it looks good on mobile. */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h2>
      
      {/* DESCRIPTION: Muted gray text. 
          'max-w-md' prevents the text from stretching too wide on large screens. */}
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      
      {/* CONDITIONAL ACTION: 
          The '&&' logic checks if an 'action' prop was provided.
          If yes, it renders a wrapper div with the action (usually a Button) inside. */}
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState; // Makes the component available to be used in Notes list or Dashboard