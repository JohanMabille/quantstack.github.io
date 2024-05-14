import PersonComponent from "../../components/about/PersonComponent";
import coreTeam from "../../components/about/Team/coreTeam";
import Andreas from "@site/src/components/about/Team/Andreas.md"


export default function AndreasComponent() {
  return(
    <PersonComponent firstName={"Andreas"} subTeam={coreTeam} BioComponent={Andreas} ></PersonComponent>
  )
}