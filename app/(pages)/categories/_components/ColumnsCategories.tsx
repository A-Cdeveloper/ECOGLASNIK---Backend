import Operations from "@/app/_components/dataOperations/IconOperationsButtons";
import Link from "next/link";
import { cloneCategoryByIdAction, deleteCategoryByIdAction } from "../_actions";
import { ProblemStatus } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsCategories = ({
  id = true,
  operations = true,
  organisations = true,
  problems = true,
}: {
  id?: boolean;
  operations?: boolean;
  organisations?: boolean;
  problems?: boolean;
}) => [
  ...(id
    ? [
        {
          header: "ID",
          accessor: (row: any) => row.cat_id,
        },
      ]
    : []),

  {
    header: id ? "Kategorija" : "Kategorije problema",
    accessor: (row: any) => {
      return <Link href={`/categories/${row.cat_id}`}>{row.cat_name}</Link>;
    },
  },
  ...(organisations
    ? [
        {
          header: "Nadležnost",
          accessor: (row: any) =>
            row.organisations.map((org: any) => (
              <p key={org.oid}>
                <Link href={`/organisations/${org.oid}`}>
                  {org.organisation_name}
                </Link>
              </p>
            )),
        },
      ]
    : []),
  ...(problems
    ? [
        {
          header: "Ukupno problema",
          accessor: (row: any) =>
            row.problems.filter(
              (problem: any) => problem.status !== ProblemStatus.ARCHIVE
            ).length,
          className: "text-start md:text-center",
        },
        {
          header: "Aktivni",
          accessor: (row: any) =>
            row.problems.filter(
              (problem: any) => problem.status === ProblemStatus.ACTIVE
            ).length,
          className: "text-start md:text-center",
        },
        {
          header: "Rešeni",
          accessor: (row: any) =>
            row.problems.filter(
              (problem: any) => problem.status === ProblemStatus.DONE
            ).length,
          className: "text-start md:text-center",
        },
        {
          header: "Zvanične prijave",
          accessor: (row: any) =>
            row.problems.filter(
              (problem: any) =>
                problem.status !== ProblemStatus.ARCHIVE &&
                problem.officialEmail === "1"
            ).length,
          className: "text-start md:text-center opacity-50",
        },
      ]
    : []),

  ...(operations
    ? [
        {
          header: "",
          accessor: (row: any) => (
            <Operations
              id={row.cat_id as number}
              basePath="categories"
              cloneAction={cloneCategoryByIdAction}
              deleteAction={
                row.problems.length === 0 ? deleteCategoryByIdAction : undefined
              }
            />
          ),
        },
      ]
    : []),
];
