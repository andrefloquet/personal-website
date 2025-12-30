import Backend from '@/components/backend';
import Frontend from '@/components/frontend';
import DevOps from '@/components/devops';
import Mobile from '@/components/mobile';
import Database from '@/components/database';
import Network from '@/components/network';

export default function Skills() {
    return (
        <>
            <Backend />
            <Frontend />
            <DevOps />
            <Mobile />
            <Database />
            <Network />
        </>
    )
}