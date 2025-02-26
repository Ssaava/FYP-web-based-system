"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Filter } from "lucide-react";

export function ParameterFilter() {
  const [selectedParameters, setSelectedParameters] = useState({
    ph: true,
    temperature: true,
    turbidity: true,
    conductivity: true,
    tds: false,
    chlorine: false,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10">
          <Filter className="mr-2 h-4 w-4" />
          Parameters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Select Parameters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedParameters.ph}
          onCheckedChange={(checked) =>
            setSelectedParameters({ ...selectedParameters, ph: checked })
          }
        >
          pH Level
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedParameters.temperature}
          onCheckedChange={(checked) =>
            setSelectedParameters({
              ...selectedParameters,
              temperature: checked,
            })
          }
        >
          Temperature
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedParameters.turbidity}
          onCheckedChange={(checked) =>
            setSelectedParameters({ ...selectedParameters, turbidity: checked })
          }
        >
          Turbidity
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedParameters.conductivity}
          onCheckedChange={(checked) =>
            setSelectedParameters({
              ...selectedParameters,
              conductivity: checked,
            })
          }
        >
          Conductivity
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedParameters.tds}
          onCheckedChange={(checked) =>
            setSelectedParameters({ ...selectedParameters, tds: checked })
          }
        >
          Total Dissolved Solids
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedParameters.chlorine}
          onCheckedChange={(checked) =>
            setSelectedParameters({ ...selectedParameters, chlorine: checked })
          }
        >
          Chlorine
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
