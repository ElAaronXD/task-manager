import { KanbanIcon, WorkflowIcon } from "lucide-react";
import Header from "../components/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import KabanBoard from "@/components/kaban-board";
import FlowView from "@/components/flow-view";

export default function Home() {
  return (
    <div className='h-full w-full'>
      <Header />
      <section className="pt-8 space-y-8 flex flex-col bg-slate-900">
        <article className="px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">Bem-vindo/a 👋</h2>
        </article>

        <Tabs defaultValue="kaban" className="w-full h-full flex">
          <TabsList>
            <TabsTrigger value="kaban" className="px-4 sm:w-40 md:w-96 h-10 text-white">
              <KanbanIcon className="size-4" /> Kaban
            </TabsTrigger>
            <TabsTrigger value="flow" className="px-4 sm:w-40 md:w-96 h-10 text-white">
              <WorkflowIcon className="size-4" /> Flow
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="kaban"
            className="bg-white dark:bg-slate-700 p-4 min-h-full"
          >
            <KabanBoard />
          </TabsContent>
          <TabsContent
            value="flow"
            className="bg-white dark:bg-slate-700 p-4"
          >
            <FlowView />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}
