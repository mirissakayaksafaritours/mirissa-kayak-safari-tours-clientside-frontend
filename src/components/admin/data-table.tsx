'use client'

import React from "react"

import { useState, useMemo } from 'react'
import { Search, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchKeys?: (keyof T)[]
  onRowClick?: (item: T) => void
  emptyMessage?: string
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchable = true,
  searchKeys = [],
  onRowClick,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const filteredData = useMemo(() => {
    let filtered = [...data]

    // Search filtering
    if (search && searchKeys.length > 0) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key]
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchLower)
          }
          if (typeof value === 'number') {
            return value.toString().includes(searchLower)
          }
          return false
        })
      )
    }

    // Sorting
    if (sortKey && sortDirection) {
      filtered.sort((a, b) => {
        const aValue = (a as Record<string, unknown>)[sortKey]
        const bValue = (b as Record<string, unknown>)[sortKey]

        if (aValue === undefined || aValue === null) return 1
        if (bValue === undefined || bValue === null) return -1

        let comparison = 0
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.localeCompare(bValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          comparison = aValue - bValue
        } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          comparison = aValue === bValue ? 0 : aValue ? -1 : 1
        }

        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return filtered
  }, [data, search, searchKeys, sortKey, sortDirection])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortKey(null)
        setSortDirection(null)
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
    if (sortDirection === 'asc') return <ChevronUp className="h-4 w-4" />
    return <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {searchable && searchKeys.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-input border-border"
          />
        </div>
      )}

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    'text-muted-foreground font-medium',
                    column.sortable && 'cursor-pointer select-none',
                    column.className
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && getSortIcon(String(column.key))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    'border-border',
                    onRowClick && 'cursor-pointer hover:bg-secondary/50'
                  )}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render
                        ? column.render(item)
                        : String((item as Record<string, unknown>)[String(column.key)] ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
