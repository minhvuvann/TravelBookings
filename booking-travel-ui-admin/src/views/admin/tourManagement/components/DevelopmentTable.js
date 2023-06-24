/* eslint-disable */
import {
  Button,
  Flex,
  Icon,
  Image,
  Progress,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
import Menu from "components/menu/MainMenu";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import DModal from "./Modal";
import Delete from "./Delete";
import { MdDelete, MdEditDocument, MdOutlineListAlt } from "react-icons/md";

export default function DevelopmentTable(props) {
  const { columnsData, tableData, setIsReset } = props;
  const [data, setData] = useState([]);
  const [tourDefault, setTourDefault] = useState({});
  const [idDetail, setIdDetail] = useState(null);
  const [idUpdate, setIdUpdate] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
const renderPaginationButtons = () => {
  const buttons = [];
  const totalPages = 10; // Total number of pagination buttons

  for (let i = 1; i <= totalPages; i++) {
    buttons.push(
      <Button
        variant="outline"
        key={i}
        style={{
          margin: "0 5px",
          padding: "5px 10px",
          border: "1px solid #ccc",
          backgroundColor: currentPage === i ? "#007bff" : "#fff",
          color: currentPage === i ? "#fff" : "#333",
          cursor: "pointer",
        }}
        onClick={() => handlePageClick(i)}
      >
        {" "}
        {i}
      </Button>
    );
  }

  return buttons;
};
  const columns = useMemo(() => columnsData, [columnsData]);
const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPage(pageNumber);
  };
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
    initialState.pageSize = 5;

    const setPage = (pageNumber) => {
      const { state, gotoPage } = tableInstance;
      const { pageSize } = state;

      const pageIndex = pageNumber - 1;
      const offset = pageIndex * pageSize;

      gotoPage(pageIndex);
      setCurrentPage(pageNumber);

      const newData = tableData.slice(offset, offset + pageSize);
      setData(newData);
    };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleDetail = (id) => {
    setIdDetail(id);
    onOpenDetail();
  };

  const handleUpdate = (id) => {
    setIdUpdate(id);
    onOpenUpdate();
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    onOpenDelete();
  };

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  useEffect(()=>{
    if(!isOpenDetail)setIdDetail(null)
  },[isOpenDetail])

  useEffect(()=>{
    if(!isOpenUpdate)setIdUpdate(null)
  },[isOpenUpdate])

  return (
    <>
      <Card
        direction="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("hint")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "NAME") {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "MAIN IMAGE") {
                      data = (
                        <Flex align="center">
                          <Image src={cell.value} alt="" />
                        </Flex>
                      );
                    } else if (cell.column.Header === "ID") {
                      data = (
                        <Text
                          _hover={{ color: "blue.600" }}
                          color={textColor}
                          fontSize="sm"
                          fontWeight="700"
                          cursor="pointer"
                          onClick={() => {
                            handleDetail(cell.row.original.id);
                          }}
                        >
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <Flex align="center" flexDirection="column">
                          <Flex>
                            <Button
                              colorScheme="orange"
                              ml={2}
                              onClick={() => {
                                handleUpdate(cell.row.original.id);
                              }}
                            >
                              <Icon
                                as={MdEditDocument}
                                width="20px"
                                height="20px"
                                color="inherit"
                              />
                            </Button>
                            <Button colorScheme="red" ml={2}>
                              <Icon
                                as={MdDelete}
                                width="20px"
                                height="20px"
                                color="inherit"
                                onClick={() => {
                                  handleDelete(cell.row.original.id);
                                }}
                              />
                            </Button>
                          </Flex>
                        </Flex>
                      );
                    } else {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value?.length > 200
                            ? `${cell.value.substring(0, 200)}...`
                            : cell.value}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "80px", md: "100px", lg: "200px" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Card>
      <Stack direction="row" spacing={4}>
        {renderPaginationButtons()}
      </Stack>
      {idDetail && (
        <DModal
          isOpen={isOpenDetail}
          onClose={onCloseDetail}
          isDetail={true}
          idDetail={idDetail}
          setIdDetail={setIdDetail}
          setIsReset={setIsReset}
        />
      )}
      {idUpdate && (
        <DModal
          isOpen={isOpenUpdate}
          onClose={onCloseUpdate}
          isUpdate={true}
          idUpdate={idUpdate}
          setIsReset={setIsReset}
        />
      )}
      <Delete
        isOpen={isOpenDelete}
        onOpen={onOpenDelete}
        onClose={onCloseDelete}
        idDelete={idDelete}
        setIsReset={setIsReset}
      />
    </>
  );
}
