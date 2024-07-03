import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getData, postData, putData, deleteData } from "../../global/server";
import { logout } from "@/redux/authSlice";
import SideNavbar from "@/components/SideNavbar";
import CustomModal from "@/components/CustomModal";

export default function Product() {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.auth.user);
  const auth = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  if (!user?.isAdmin || !user) {
    return <Navigate to="/" />;
  }

  const getProducts = async () => {
    try {
      const response = await getData("/api/supplement", auth.token);
      console.log("response ", response);
      setProducts(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImg(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productImg) {
      setError("Please select an image file.");
      return;
    }

    setIsUploading(true); // Start uploading
    setError(""); // Clear any previous error

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("file", productImg);

    try {
      await postData("/api/supplement", formData, auth.token, "media");

      getProducts(); // Refresh the product list
      setIsModalOpen(false); // Close the modal after successful submission
      setName("");
      setPrice("");
      setProductImg(null);
    } catch (error) {
      console.error("Error creating product", error);
      setError("Error creating product. Please try again.");
    } finally {
      setIsUploading(false); // Stop uploading
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editProductId) {
      console.error("Edit product ID is not set.");
      return;
    }

    setIsUploading(true); // Start editing
    setError(""); // Clear any previous error

    if (!productImg) {
      setError("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("file", productImg);

    try {
      await putData(
        `/api/supplement/${editProductId}`,
        formData,
        auth.token,
        "media"
      );

      getProducts(); // Refresh the product list
      setIsModalOpen(false); // Close the modal after successful submission
      setName("");
      setPrice("");
      setProductImg(null);
      setEditProductId(null);
    } catch (error) {
      console.error("Error editing product", error);
      setError("Error editing product. Please try again.");
    } finally {
      setIsUploading(false); // Stop editing
    }
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteData(`/api/supplement/${productId}`, auth.token);

      getProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error("Error deleting product", error);
      setError("Error deleting product. Please try again.");
    }
  };

  useEffect(() => {
    getProducts();
  }, [location]);

  const handleEditModalOpen = (product: any) => {
    console.log("editProductId is " + editProductId);
    console.log(product._id);
    setEditProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setProductImg(product.productImg.secure_url);
    setIsModalOpen(true);
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <SideNavbar />
      </div>
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
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Link className="text-sm font-medium underline" to="#">
                  View All
                </Link>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products?.length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-end">
            <Button className="w-40" onClick={() => setIsModalOpen(true)}>
              Create New Product
            </Button>
          </div>

          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Product Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product: any) => (
                  <TableRow key={product?._id}>
                    <TableCell>{product?._id}</TableCell>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{product?.price}</TableCell>
                    <TableCell>
                      <img
                        src={product?.productImg.secure_url}
                        alt={product?.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          color="blue"
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditModalOpen(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="red"
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(product._id)}
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
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          toggleModal={() => setIsModalOpen(false)}
        >
          <form onSubmit={editProductId ? handleEdit : handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!editProductId} // Only required for new product creation
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isUploading}
                className={isUploading ? "bg-gray-400" : ""}
              >
                {isUploading
                  ? "Uploading..."
                  : editProductId
                  ? "Update Product"
                  : "Create Product"}
              </Button>
            </div>
          </form>
        </CustomModal>
      )}
    </div>
  );
}

function Package2Icon(props: any) {
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

function SearchIcon(props: any) {
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
