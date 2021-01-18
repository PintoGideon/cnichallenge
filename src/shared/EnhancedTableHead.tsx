import React, { useCallback } from "react";
import classNames from "classnames";
import {
  Typography,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    tableSortLabel: {
      cursor: "text",
      userSelect: "auto",
      color: "inherit !important",
    },
    noIcon: {
      "& path": {
        display: "none !important",
      },
    },
    paddingFix: {
      paddingLeft: theme.spacing(3),
    },
  });

interface Row {
  numeric?: boolean;
  name?: string;
  id?: string;
  label?: string;
}

interface EnhancedTableHeadProps extends WithStyles<typeof styles> {
  onRequestSort?: (event: any, property: any) => void;
  order?: "desc" | "asc";
  orderBy?: "desc" | "asc";
  rows: Row[];
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, rows, onRequestSort, classes } = props;

  const createSortHandler = useCallback(
    (property) => (event: any) => {
      onRequestSort && onRequestSort(event, property);
    },
    [onRequestSort]
  );

  return (
    <TableHead>
      <TableRow>
        {rows.map((row, index) => (
          <TableCell
            key={index}
            align={row.numeric ? "right" : "inherit"}
            padding="default"
            sortDirection={orderBy === row.name ? order : undefined}
            className={index === 0 ? classes.paddingFix : undefined}
          >
            {onRequestSort ? (
              <Tooltip
                title="Sort"
                placement={row.numeric ? "bottom-end" : "bottom-start"}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  <Typography variant="body2">{row.label}</Typography>
                </TableSortLabel>
              </Tooltip>
            ) : (
              <TableSortLabel
                className={classNames(classes.tableSortLabel, classes.noIcon)}
              >
                <Typography variant="body2">{row.label}</Typography>
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default withStyles(styles, { withTheme: true })(EnhancedTableHead);
