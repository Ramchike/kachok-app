import { SettingsModal } from "../components/modals";

export const SettingsPage = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <SettingsModal isOpen={true} onClose={() => {}} />
        </div>
    );
}