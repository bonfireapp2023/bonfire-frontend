import React, { useRef, useState, useEffect }from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import {PlusIcon} from "../Icons/PlusIcon";
import {VerticalDotsIcon} from "../Icons/VerticalDotsIcon";
import {SearchIcon} from "../Icons/SearchIcon";
import {ChevronDownIcon} from "../Icons/ChevronDownIcon";
import {EditIcon} from "../Icons/EditIcon";
import {DeleteIcon} from "../Icons/DeleteIcon";
import {ShareIcon} from "../Icons/ShareIcon";
import {EyeIcon} from "../Icons/EyeIcon";
import {columns, formatOptions} from "./data";
import {capitalize} from "./utils";
import {Popover, PopoverTrigger, PopoverContent, Spacer} from "@nextui-org/react";
import FileInput from "./FileInput";
import { ethers } from "ethers";
import * as abi from "../ABIs/abis";

import { Web3Storage } from 'web3.storage'
import axios from "axios";
function getAccessToken () {
    return process.env.REACT_APP_WEB3STORAGE_TOKEN
}
  
function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
}

function getFiles () {
    const fileInput = document.querySelector('input[type="file"]')
    return fileInput.files
}

async function storeFiles (files) {
    console.log("storing to filecoin...");
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

const formatColorMap = {
  image: "success",
  text: "default",
  health_record: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "format", "actions", "share"];

const All = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [formatFilter, setformatFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [files, setFiles] = useState("");
  const [targetAddress, setTargetAddress] = React.useState("");

  const [selectedFormatKeys, setSelectedFormatKeys] = React.useState(new Set(["health"]));

  const selectedFormatValue = React.useMemo(
    () => Array.from(selectedFormatKeys).join(", ").replaceAll("_", " "),
    [selectedFormatKeys]
  );

  const handleShare = () => {
    console.log("target: ", targetAddress);
  }

  useEffect( () => {
    async function fetchData() {
        const { ethereum } = window;
        let user_address;
        await ethereum
            .request({ method: 'eth_requestAccounts'})
            .then((accounts) => {
                //console.log("addrerss:", accounts[0])
                user_address = accounts[0];
            })
            //.then(() => (window.location = '/home'))
            .catch((err) => console.log(err));
        // console.log(JSON.stringify(user_address));
        // console.log(typeof(user_address));

        axios.get(`http://localhost:4000/data`).then(result => {
            //console.log(result);    
            var list = [];
            //console.log(result.data);

            result.data.forEach((item) => {
                // console.log(item.body);
                // console.log(item.body["whitelist"]);
                if(item.body["whitelist"].includes(user_address))
                    list.push(item.body)
            })
            setUsers(list);
        });
      }
      fetchData();
  },[users]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (formatFilter !== "all" && Array.from(formatFilter).length !== formatOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(formatFilter).includes(user.format),
      );
    }

    return filteredUsers;
  }, [users, filterValue, formatFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
        //   <User
        //     avatarProps={{radius: "lg", src: user.avatar}}
        //     description={user.email}
        //     name={cellValue}
        //   >
        //     {user.email}
        //   </User>
          <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "format":
        return (
          <Chip className="capitalize" color={formatColorMap[user.format]} size="sm" variant="flat">
            {cellValue === "health_record" ? "health record" : cellValue}
          </Chip>
        );
      case "actions":
        return (
        <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
            
          </div>
        );
      case "share":
        return(
            <Tooltip content="Share">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                    <Button color="default">Share</Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        <p className="text-small font-bold text-foreground" {...titleProps}>
                        Share to
                        </p>
                        <div className="mt-2 flex flex-col gap-2 w-full">
                        <Input label="User Address" size="sm" variant="bordered" 
                        // value={targetAddress}
                        // onValueChange={setTargetAddress}
                       />
                        </div>
                        <Spacer y={2}/>
                        <div className="flex justify-end">
                            <Button color="default" onClick={handleShare}>done</Button>
                        </div>
                    </div>
                    )}
                </PopoverContent>
                </Popover>
              </span>
            </Tooltip>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  function getExtension(filename) {
    return filename.split('.').pop()
  }

  const handleUpload = async e => {
    console.log("uploading...");
    try{
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files);
            const extension = getExtension(e.target.files[0].name);
            if(extension === "json"){
                const fileReader = new FileReader();
                fileReader.readAsText(e.target.files[0], "UTF-8");
                fileReader.onload = (e) => {
                    console.log("e.target.result", e.target.result);
                }
                setFiles(e.target.files[0]);

                var cid = await storeFiles(getFiles());
                handleAddDataToContract(cid, e.target.files[0].name);
            }
    };
    }catch(err){
        console.log(err);
    }
};

const handleAddDataToContract = async (cid, name) => {
    
    const { ethereum } = window;
    var user_address;
    await ethereum
        .request({ method: 'eth_requestAccounts'})
        .then((accounts) => {
            console.log("addrerss:", accounts[0])
            user_address = accounts[0];
        })
        //.then(() => (window.location = '/home'))
        .catch((err) => console.log(err));
    
    axios.post("http://localhost:4000/data", {
        'Content-Type': 'application/json',
        'body': {
            "id": cid,
            "format": "health_record",
            "name": name,
            "whitelist": [user_address]
        }
     }
     ).then(response => {
        console.log('Item added:', response.data);
      })
      .catch(error => {
        console.error('Error adding item:', error);
      });

    // const BONFIRE_FACTORY_CONTRACT_ADDRESS = "0x96D7cCfa8cB77CD5E807d88967D31940b8258EcF";
    // const provider = new ethers.BrowserProvider(ethereum, "any");
    // const factoryContract = new ethers.Contract(
    //     BONFIRE_FACTORY_CONTRACT_ADDRESS,
    //     abi.bonfireFactoryabi.abi,
    //     provider
    // );
    
    // try{
    //     const user_contract_address = await factoryContract.getUserContract(user_address);
    //     console.log(user_contract_address);
    //     const userContract = new ethers.Contract(
    //         user_contract_address,
    //         abi.bonfireUser.abi,
    //         await provider.getSigner()
    //     );
            
    //     await userContract.grantAccess(ComplexString(cid), userContract);

    // } catch(e){
    //     console.log(e);
    // }
}


  const topContent = React.useMemo(() => {  

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  format
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={formatFilter}
                selectionMode="multiple"
                onSelectionChange={setformatFilter}
              >
                {formatOptions.map((format) => (
                  <DropdownItem key={format.uid} className="capitalize">
                    {capitalize(format.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Popover placement="bottom" showArrow offset={10}>
                <PopoverTrigger>
                    <Button color="primary" endContent={<ShareIcon />}>
                        retrieve
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                        {/* <p className="text-small font-bold text-foreground" {...titleProps}>
                        Fetch from
                        </p> */}
                        <div className="mt-2 flex flex-col gap-2 w-full">
                            <Input defaultValue="" label="User Address" size="sm" variant="bordered" />
                            <Input defaultValue="" label="CID" size="sm" variant="bordered" />
                        </div>
                        <Spacer y={2}/>
                        <div className="flex justify-end">
                        <Button color="default">fetch</Button>
                    </div>
                    </div>
                    )}
                </PopoverContent>
            </Popover>            
            <FileInput onChange={handleUpload}/>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    formatFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);


  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default All;