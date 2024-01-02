<script lang="ts">
	import List, { Item, Separator, Text } from '@smui/list';
    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import Textfield from '@smui/textfield';
    import VerticalList from '$lib/VerticalList.svelte';

	let clicked = 'nothing yet';
    let registerText="";
</script>

<a href="/detail/1">test</a>

<VerticalList gap={30}>
    <div class="item">
        <Paper>
            <Title>新規登録</Title>
            <Textfield
                type="email"
                bind:value={registerText}
                updateInvalid
                label="タイトル"
                style="width: 100%;"
            ></Textfield>
        </Paper>
    </div>
    <div class="item">
        <Paper>
            <Title>
                一覧
            </Title>
            <Content>
                <List class="demo-list">
                    <Separator />
                    <Item on:SMUI:action={() => (clicked = 'Cut')}><Text>Cut</Text></Item>
                    <Item on:SMUI:action={() => (clicked = 'Copy')}><Text>Copy</Text></Item>
                    <Item on:SMUI:action={() => (clicked = 'Paste')}><Text>Paste</Text></Item>
                    <Item on:SMUI:action={() => (clicked = 'Delete')}><Text>Delete</Text></Item>
                </List>
            </Content>
        </Paper>
    </div>
</VerticalList>
    
<pre class="status">Clicked: {clicked}</pre>

<style>
    .item {
        width: 100%;
    }
</style>