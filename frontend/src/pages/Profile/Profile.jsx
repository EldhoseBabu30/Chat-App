import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Profile = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        let width = img.width;
                        let height = img.height;

                        const maxDimension = 800;
                        if (width > height && width > maxDimension) {
                            height = (height * maxDimension) / width;
                            width = maxDimension;
                        } else if (height > maxDimension) {
                            width = (width * maxDimension) / height;
                            height = maxDimension;
                        }

                        canvas.width = width;
                        canvas.height = height;

                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                        resolve(compressedDataUrl);
                    } catch (error) {
                        reject(error);
                    }
                };

                img.onerror = (error) => {
                    reject(error);
                };
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("File size must be less than 5MB");
            }

            if (!file.type.startsWith('image/')) {
                throw new Error("Please upload an image file");
            }

            const compressedImage = await compressImage(file);
            setSelectedImg(compressedImage);
            await updateProfile({ profilePic: compressedImage });
        } catch (error) {
            console.error("Error processing image:", error);
            alert(error.message || "Error processing image. Please try again.");
        }
    };

    return (
        <div className="h-screen pt-20 bg-gray-50 text-gray-900">
            <div className="max-w-3xl mx-auto p-6 py-10">
                <div className="bg-white shadow-lg rounded-xl p-8 space-y-8 border border-gray-200">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                        <p className="mt-2 text-gray-600">Manage your profile information</p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-36 h-36">
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-md"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute bottom-2 right-2 bg-gray-100 hover:bg-gray-200
                                    p-2 rounded-full cursor-pointer transition-all duration-200 shadow-md
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                <Camera className="w-6 h-6 text-gray-600" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">
                            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-700" />
                                <span className="font-medium">Full Name</span>
                            </div>
                            <p className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-900">
                                {authUser?.fullName || "N/A"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-gray-700" />
                                <span className="font-medium">Email Address</span>
                            </div>
                            <p className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-900">
                                {authUser?.email || "N/A"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 bg-gray-100 rounded-xl p-6 shadow-md border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="flex items-center justify-between py-2 border-b border-gray-300">
                                <span>Member Since</span>
                                <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500 font-medium">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;