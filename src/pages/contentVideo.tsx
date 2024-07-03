import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import UploadContentVideoModal from "@/components/UploadContentVideoModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getData, deleteData } from "../../global/server";
import { logout } from "@/redux/authSlice";
import SideNavbar from "@/components/SideNavbar";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ContentVideos() {
  const [contentVideos, setContentVideos] = useState([]);
  const user: any = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  if (!user?.isAdmin || !user) {
    return <Navigate to="/" />;
  }

  const getContentVideo = async () => {
    try {
      const response = await getData("/api/contentVideo", auth.token);
      setContentVideos(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContentVideo();
  }, [location]);

  // const handleEdit = (videoId: string) => {
  //   setSelectedVideoId(videoId);
  //   toggleModal();
  // };

  const handleDelete = async (videoId: string) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      await deleteData(`/api/contentVideo/${videoId}`, auth.token);
      getContentVideo(); // Refresh content video list
    } catch (err) {
      console.log("Error deleting video:", err);
    }
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <SideNavbar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" to="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <Button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </Button>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Content Videos
                </CardTitle>
                <Link className="text-sm font-medium underline" to="#">
                  View All
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {contentVideos?.length}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Button className="w-60" onClick={toggleModal}>
              Upload New Content Video
            </Button>
          </div>
          <UploadContentVideoModal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            // videoId={selectedVideoId}
            onVideoUploaded={getContentVideo}
          />
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Video</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentVideos?.map((content: any) => (
                  <TableRow key={content?._id}>
                    <TableCell>{content?._id}</TableCell>
                    <TableCell>{content?.title}</TableCell>
                    <TableCell>{content?.description}</TableCell>
                    <TableCell>{content?.category}</TableCell>
                    <TableCell>
                      {content?.videoMedia?.resource_type === "video" ? (
                        <video
                          src={content?.videoMedia.secure_url}
                          style={{ width: "150px", height: "100px" }}
                          controls
                        />
                      ) : (
                        <img
                          src={content?.videoMedia.secure_url}
                          alt={content?.title}
                          style={{ width: "150px", height: "100px" }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* <Button
                          color="blue"
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(content._id)}
                        >
                          Edit
                        </Button> */}
                        <Button
                          color="red"
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(content._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
