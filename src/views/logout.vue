<template>
    <h1>loging off...</h1>
</template>
<script>
export default {
    name:"logout",
    created(){
        this.$store.dispatch("destroy_token").then(()=>{
            this.$router.push('/');
        });
    }
}
</script>