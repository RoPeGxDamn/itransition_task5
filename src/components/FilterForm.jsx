import { useEffect } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { generateFakeData } from "../utils/generateFakeData";
import { getRandomInt } from "../utils/getRandomInt";
import { useFilter } from "../providers/FilterProvider";
import { generateErrors } from "../utils/generateErrors";

const REGIONS = [
  { key: "de", value: "Germany" },
  { key: "ru", value: "Russia" },
  { key: "ka_GE", value: "Georgia" },
];

export default function FilterForm({ setMockData, mockData, page }) {
  const { controlForm, setControlForm, tableRef } = useFilter();

  useEffect(() => {
    tableRef.current.scrollTop = 0;
    controlForm.errors > 0
      ? setMockData(
          generateErrors(
            [
              ...generateFakeData(
                20,
                controlForm.region,
                page,
                controlForm.seed
              ),
            ],
            controlForm.errors,
            controlForm.region
          )
        )
      : setMockData([
          ...generateFakeData(20, controlForm.region, page, controlForm.seed),
        ]);
  }, [controlForm]);

  const handleFormChange = (e) =>
    setControlForm({ ...controlForm, [e.target.id]: e.target.value });
  const handleRandomClick = () =>
    setControlForm({ ...controlForm, seed: getRandomInt(100000) });
  const handleExportClick = () => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(mockData);
    download(csvConfig)(csv);
  };

  return (
    <Form as={Row}>
      <Col>
        <Form.Group as={Stack} direction={"horizontal"} gap={3}>
          <Form.Label>Region:</Form.Label>
          <Form.Select
            id="region"
            value={controlForm?.region}
            onChange={handleFormChange}
          >
            {REGIONS.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col>
        <Form.Group as={Stack} direction={"horizontal"} gap={3}>
          <Form.Label>Errors:</Form.Label>
          <Form.Range
            min={0}
            max={10}
            step={0.25}
            value={controlForm.errors}
            id="errors"
            onChange={handleFormChange}
          />
          <Form.Control
            type="number"
            id="errors"
            min={0}
            max={1000}
            onChange={(e) =>
              e.target.value >= 0 &&
              +e.target.value <= 1000 &&
              handleFormChange(e)
            }
            value={controlForm.errors}
          />
        </Form.Group>
      </Col>
      <Col>
        <Form.Group as={Stack} direction={"horizontal"} gap={3}>
          <Form.Label>Seed:</Form.Label>
          <Form.Control
            id="seed"
            onChange={handleFormChange}
            value={controlForm.seed}
            type="number"
            min={0}
          />
          <Button onClick={handleRandomClick}>Random</Button>
        </Form.Group>
      </Col>
      <Button as={Col} onClick={handleExportClick}>
        Export
      </Button>
    </Form>
  );
}
