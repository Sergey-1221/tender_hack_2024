"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import DatePickerWithRange from "./date-picker";

const data: Tender[] = [
  {
    "name": "Закупка первичного и вторичного полипропилена",
    "tender_customer": "Частное предприятие \"ГАРДЕНПЛАСТ\"",
    "price": "2",
    "currency": "BYN",
    "url": "https://icetrade.by/tenders/all/view/1124291",
    "description": "Закупка первичного и вторичного полипропилена",
    "customer_data": "Частное производственное унитарное предприятие \"ГАРДЕНПЛАСТ\"\r\nРеспублика Беларусь, Гродненская обл., г. Волковыск, 231900, ул. Панковой, 65Е\r\n  591411049",
    "customer_contacts": "Акудович Анастасия Сергеевна, +375 44 711 39 90, zakupki@gardenplast.by",
    "created_date": 1707858000.0,
    "request_end_date": 1728421200.0,
    "other_information": "",
    "files": [
      [
        "priglashenie-zapros-cenovyh-predlozhenijj(1707812819).doc",
        "https://icetrade.by/auction/download/auction/1124291?f=detail&n=0"
      ]
    ],
    "lots": [
      [
        "Первичный гомополипропилен  PPG1350-21 либо аналог, для литья изделий общего назначения.",
        "20 т, 1 BYN"
      ],
      [
        "Вторичный полипропилен для литья изделий общего назначения, в гранулированном либо дробленом виде. Цвета под закрас, с ПТР от 10 г/10 мин. Без запаха, включений и примесей.",
        "20 т, 1 BYN"
      ]
    ],
    "is_active": true,
    "id": "1124291"
  },
  {
    "name": "Проектирование дорог в садовом товариществе протяжённость около 3500 метров,шириной 6-7 метров с обустройством водоотведения талых вод",
    "tender_customer": "СТ «Птичь-2»Дзержинский район.",
    "price": "1",
    "currency": "BYN",
    "url": "https://icetrade.by/tenders/all/view/1132336",
    "description": "Проектирование дорог в садовом товариществе протяжённость около 3500 метров,шириной 6-7 метров с обустройством водоотведения талых вод",
    "customer_data": "Садоводческое товарищество «Птичь-2» Дзержинский район.\r\nРеспублика Беларусь, Минская обл., Дзержинский район, Путчинский с/с, д. Нарейки., 222744, Республика Беларусь, Минская область, Дзержинский район, Путчинский с/с, д. Нарейки.\r\n  691415543",
    "customer_contacts": "Смирнов Дмитрий Александрович, +375 44 5358358, gintonic023@gmail.com и  ptich2@mail.ru",
    "created_date": 1710363600.0,
    "request_end_date": 1718744400.0,
    "other_information": "",
    "files": [
      [
        "shema-plan-ptich-2(1710415514).pdf",
        "https://icetrade.by/auction/download/auction/1132336?f=detail&n=0"
      ]
    ],
    "lots": [
      [
        "Проектирование дорог в садовом товариществе протяжённость около 3500 метров,шириной 6-7 метров с обустройством водоотведения талых вод",
        "1 шт., 1 BYN"
      ]
    ],
    "is_active": true,
    "id": "1132336"
  },
  {
    "name": "услуги по проведению шеф-надзора при выполнении ремонта турбокомпрессора К-3001 (ОГМ)",
    "tender_customer": "ОАО \"Мозырский НПЗ\"",
    "price": "1",
    "currency": "BYN",
    "url": "https://icetrade.by/tenders/all/view/1136048",
    "description": "услуги по проведению шеф-надзора при выполнении ремонта турбокомпрессора К-3001 (ОГМ)",
    "customer_data": "Открытое акционерное общество \"Мозырский нефтеперерабатывающий завод\"\r\nРеспублика Беларусь, Гомельская обл., г. Мозырь-11, 247782, г. Мозырь-11\r\n  400091131",
    "customer_contacts": "Попок Анна Александровна, +375 23 637 46 78, aapopok@mnpz.by",
    "created_date": 1711573200.0,
    "request_end_date": 1715000400.0,
    "other_information": "см. Приложение",
    "files": [
      [
        "priglashenie(1711612397).pdf",
        "https://icetrade.by/auction/download/auction/1136048?f=detail&n=0"
      ],
      [
        "tz-k-3001(1711612427).pdf",
        "https://icetrade.by/auction/download/auction/1136048?f=detail&n=1"
      ]
    ],
    "lots": [
      [
        "Технический надзор (шеф-надзора) при проведении среднего ремонта однокорпусного многоступенчатого центробежного компрессора STC-SH (12-7-B) производства компании «Demag Delaval», Германия и паровой турбины конденсатного типа GK 26/40 производства компании «Siemens AG», Германия, технологическая позиция К-3001, С-3000, КУКК, КПБ, ОАО «Мозырского НПЗ» с проведением пуско-наладочных работ",
        "1 усл., 1 BYN"
      ]
    ],
    "is_active": true,
    "id": "1136048"
  },
  {
    "name": "закупка задвижек , клапанов запорных, клапанов мембранных  и клапанов регулирующих под приварку с электроприводом",
    "tender_customer": "Открытое акционерное общество \"Гомельский химический завод\"",
    "price": "258 411",
    "currency": "BYN",
    "url": "https://icetrade.by/tenders/all/view/1133904",
    "description": "закупка задвижек , клапанов запорных, клапанов мембранных  и клапанов регулирующих под приварку с электроприводом",
    "customer_data": "Открытое акционерное общество \"Гомельский химический завод\"\r\nРеспублика Беларусь, Гомельская обл., г. Гомель, 246012, ул. Химзаводская, 5\r\n  400069905",
    "customer_contacts": "Должностные лица Заказчика, которым вменено в обязанность, поддерживать связь с участниками: \r\n- по организационным вопросам – начальник конкурсного отдела Дружинина Ольга Васильевна т/ф. +375 (232) 23-12-11, 49-22-87;\r\n- разъяснение вопросов по заданию на закупку – инженер ОКО Бекаревич Дмитрий Николаевич т/ф. +375 (232) 23-12-38, 23-12-43;\r\n - разъяснение вопросов по техническому заданию – начальник ПВК Павловский Владимир Иванович т/ф. +375 (232) 49-23-03.",
    "created_date": 1710882000.0,
    "request_end_date": 1714734000.0,
    "other_information": "Обязательное условие – заказчик заключает договор (контракт) с участником согласно приложенной формы проекта договора (контракта).                  См. Приложение № 2.\r\nУчастники имеют право вносить изменения в проект договора (приложение № 2), соответствующие действующему законодательству Республики Беларусь по согласованию с Заказчиком. Информация об изменении условий договора с указанием новой редакции должна быть отражена в предложении участника.\r\nВ случае если участник процедуры, заявляет о необходимости корректировки договора в пунктах 7,8,10 с ухудшением условий для Организатора, то Организатор оставляет за собой право отклонить такое предложение участника.",
    "files": [
      [
        "konkursnaya-dokumentaciya-(1710936097).doc",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=0"
      ],
      [
        "2-proekt-kontrakta-na-postavku-oborudovaniya-bez-mo-(1710936105).doc",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=1"
      ],
      [
        "pr-3-ol-1(1710936113).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=2"
      ],
      [
        "pr-4-ol-1(1710936124).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=3"
      ],
      [
        "pr-4-ol-2(1710936130).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=4"
      ],
      [
        "pr-4-ol-3(1710936137).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=5"
      ],
      [
        "pr-5-ol-1(1710936147).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=6"
      ],
      [
        "pr-5-ol-2(1710936154).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=7"
      ],
      [
        "pr-6-ol-1(1710936164).pdf",
        "https://icetrade.by/auction/download/auction/1133904?f=detail&n=8"
      ]
    ],
    "lots": [
      [
        "1.\tЗадвижка 30с41нж Ду 50 Ру 16                 (либо аналог) \r\nОриентировочная стоимость за 1 шт.  – 873,09 бел. руб. с НДС\r\nТовар должен быть новым.\r\n\t6 шт.\t\r\nПриложение № 3\r\n(Опросный лист № 1)\n\n\r\n2.\tЗадвижка 30с41нж Ду 80 Ру 16                 (либо аналог) \r\nОриентировочная стоимость за 1 шт.  – 1362,98 бел. руб. с НДС\r\nТовар должен быть новым.\r\n\t4 шт.\t\r\nПриложение № 3\r\n(Опросный лист № 1)\n\n\r\n3.\tЗадвижка 30с41нж Ду 100 Ру 16                 (либо аналог) \r\nОриентировочная стоимость за 1 шт.  – 1859,99 бел. руб. с НДС\r\nТовар должен быть новым.\r\n\t10 шт.\t\r\nПриложение № 3\r\n(Опросный лист № 1)\n\n\r\n4.\tЗадвижка 30с41нж Ду 150 Ру 16                 (либо аналог) \r\nОриентировочная стоимость за 1 шт.  – 2912,87 бел. руб. с НДС\r\nТовар должен быть новым.\t12 шт.\tПриложение № 3\r\n(Опросный лист № 1)\n\r\n5.\tЗадвижка 30с41нж Ду 200 Ру 16                 (либо аналог) \r\nОриентировочная стоимость за 1 шт.  – 5115,86 бел. руб. с НДС\r\nТовар должен быть новым.\t4 шт.\tПриложение № 3\r\n(Опросный лист № 1)\n\r\n6.\tЗадвижка 30с41нж Ду 250 Ру 16                 (либо аналог) \r\nОриентировочная стоимость за 1 шт.  – 8159,17 бел. руб. с НДС\r\nТовар должен быть новым.\t2 шт.\tПриложение № 3\r\n(Опросный лист № 1)",
        "38 шт., 90 541 BYN"
      ],
      [
        "1.\tКлапан запорный 15с22нж Ду 50 Ру 40 \r\nОриентировочная стоимость за 1 шт.  –  1070,00 бел. руб. с НДС\r\nТовар должен быть новым.\t2 шт.\t\r\nПриложение № 4\r\n(Опросный лист № 1)\n\n\r\n2.\tКлапан запорный 15с22нж Ду 80 Ру 40 \r\nОриентировочная стоимость за 1 шт.  –  1721,20 бел. руб. с НДС\r\nТовар должен быть новым.\t4 шт.\t\r\nПриложение № 4\r\n(Опросный лист № 1)\n\n\r\n3.\tКлапан запорный 15с22нж Ду 100 Ру 40 \r\nОриентировочная стоимость за 1 шт.  –  2103,56 бел. руб. с НДС\r\nТовар должен быть новым.\t3 шт.\t\r\nПриложение № 4\r\n(Опросный лист № 1)\n\n\r\n4.\tКлапан мембранный типа 15с75п \r\nДу25 Ру 10 \r\nОриентировочная стоимость за 1 шт.  –  823,36 бел. руб. с НДС\r\nТовар должен быть новым.\t2 шт.\t\r\nПриложение № 4\r\n(Опросный лист № 2)\n\n\r\n5.\tКлапан мембранный типа 15с75п \r\nДу50 Ру 10 \r\nОриентировочная стоимость за 1 шт.  –  1157,60 бел. руб. с НДС\r\nТовар должен быть новым.\t4 шт.\t\r\nПриложение № 4\r\n(Опросный лист № 3)",
        "15 шт., 21 612 BYN"
      ],
      [
        "1.\tКлапан регулирующий под приварку с электроприводом\r\nДу 300 Ру 630 \r\nОриентировочная стоимость за 1 шт.  –  103 505,34 бел. руб. с НДС\r\nТовар должен быть новым.                                                \t1 шт.\tПриложение № 5\r\n(Опросный лист № 1)\n\r\n2.\tКлапан регулирующий под приварку с электроприводом\r\nДу 20 Ру 250                                                  Ориентировочная стоимость за 1 шт.  –  20 731,62 бел. руб. с НДС\r\nТовар должен быть новым.\r\n\t1 шт.\tПриложение № 5\r\n(Опросный лист № 2)",
        "2 шт., 123 303 BYN"
      ],
      [
        "1.\tКлапан регулирующий с электроприводом\r\nДу 50 Ру 25                                                  Ориентировочная стоимость за 1 шт.  –  22 955,28 бел. руб. с НДС\r\nТовар должен быть новым.\t1 шт.\tПриложение № 6\r\n(Опросный лист № 1)",
        "1 шт., 22 955 BYN"
      ]
    ],
    "is_active": true,
    "id": "1133904"
  },
]

type Tender = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const columns: ColumnDef<Tender>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "tender_customer",
    header: "Заказчик",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tender_customer")}</div>
    ),
  },
  {
    accessorKey: "customer_data",
    header: "о Заказчике",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("customer_data")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price").replace(" ", ".")}</div>
    ),
  },
  {
    accessorKey: "currency",
    header: "Валюта",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("currency")}</div>
    ),
  },


  
]

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })


  const router = useRouter();
  return (
    <div className="w-full">

      <div className="flex items-center py-4">
        <DatePickerWithRange />
        <Input
          placeholder="Поиск..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (

              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    router.push(`/your-url`)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                </TableRow>

              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>

              
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
       
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
