const studentData = [
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    class: "1",
    free: "₹50,000",
    action: "PDF",
    color: "bg-gray-100",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    class: "2",
    free: "₹50,000",
    action: "PDF",
    color: "bg-white",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    class: "3",
    free: "₹50,000",
    action: "PDF",
    color: "bg-gray-100",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    class: "4",
    free: "₹50,000",
    action: "PDF",
    color: "bg-white",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    class: "5",
    free: "₹50,000",
    action: "PDF",
    color: "bg-gray-100",
  },
];

export default function StudentTable() {
  return (
    <>
      <div className=" w-full">
        <table className="w-full bg-white    rounded-lg overflow-hidden">
          <thead className=" bg-blue-200  h-14 py-10">
            <tr className="  text-gray-700   text-sm font-normal leading-normal  ">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">UserId</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Free</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {studentData.map((item, index) => (
              <tr
                key={index}
                className={` text-gray-700   text-sm font-normal leading-normal ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-left">{item.srNo}</td>
                <td className="py-4 px-6 text-left">{item.userId}</td>
                <td className="py-4 px-6 text-left">{item.name}</td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.free}</td>
                <td className="py-4 px-6 text-left">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    {item.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
