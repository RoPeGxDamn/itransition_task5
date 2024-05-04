import { Spinner, Table } from "react-bootstrap";
import { useFilter } from "../providers/FilterProvider";
import { generateFakeData } from "../utils/generateFakeData";
import { useState } from "react";
import { generateErrors } from "../utils/generateErrors";

const TABLE_ATTRIBUTES = ["ID", "Fullname", "Address", "Phone number"];

export default function DataTable({ mockData, setMockData, page }) {
  const { tableRef, controlForm } = useFilter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      ref={tableRef}
      style={{ maxHeight: "97%", overflowY: "auto", marginTop: "10px" }}
      onScroll={(e) => {
        if (
          Math.abs(
            e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
          ) <= 1
        ) {
          setIsLoading(true);
          setTimeout(() => {
            controlForm.errors > 0
              ? setMockData([
                  ...mockData,
                  ...generateErrors(
                    [
                      ...generateFakeData(
                        10,
                        controlForm.region,
                        page,
                        controlForm.seed
                      ),
                    ],
                    controlForm.errors,
                    controlForm.region
                  ),
                ])
              : setMockData([
                  ...mockData,
                  ...generateFakeData(
                    10,
                    controlForm.region,
                    page,
                    controlForm.seed
                  ),
                ]);

            setIsLoading(false);
          }, 1000);
        }
      }}
    >
      <Table striped responsive>
        <thead className="sticky-top">
          <tr>
            <th>#</th>
            {TABLE_ATTRIBUTES.map((_, index) => (
              <th key={index}>{_}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData?.map((i, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{i?.id}</td>
                <td>{i?.fullname}</td>
                <td>{i?.address}</td>
                <td>{i?.phoneNumber}</td>
              </tr>
            );
          })}
          {isLoading && <Spinner animation="border" className="m-4" />}
        </tbody>
      </Table>
    </div>
  );
}
