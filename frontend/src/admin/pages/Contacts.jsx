import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import useContactStore from "../../store/useContactStore";
import DashboardHeader from "../../components/DashboardHeader";

export default function Contacts() {
  const { contacts, fetchContacts, loadingContacts, deleteContact } = useContactStore();
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts()
      .then(() => toast.success("Contacts loaded successfully 🚀"))
      .catch(() => toast.error("Failed to load contacts ❌"));
  }, [fetchContacts]);

  const handleDelete = (id) => {
    toast.dismiss()
    toast(
      (t) => (
        <div className="flex flex-col gap-6 p-6 bg-white rounded-2xl text-center max-w-md mx-auto">
          <span className="text-xl font-bold text-gray-900">
            Delete this contact?
          </span>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
              onClick={async () => {
                try {
                  await deleteContact(id);
                  toast.dismiss(t.id);
                  toast.success("Contact deleted ✅");
                } catch {
                  toast.dismiss(t.id);
                  toast.error("Delete failed ❌");
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-center", style: { width: "100%", maxWidth: "400px" } }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" reverseOrder={false} />
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Submissions</h2>

        {loadingContacts ? (
          <p className="text-gray-700 text-center text-lg">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No contacts found </p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex justify-between items-start"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-gray-700 mt-2">{contact.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Submitted: {new Date(contact.submittedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
                  onClick={() => handleDelete(contact._id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
