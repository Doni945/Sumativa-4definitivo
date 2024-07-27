import React from 'react';
import Producto from '@/components/Producto';
import Usuarios from '@/components/Usuarios';
import ActuElimiProduc from '@/components/ActuElimiProduc';
import ActuElimiUsua from '@/components/ActuElimiUsua';
import Layout from '@/components/layout';

const AdminPost = () => {
  return (
    <Layout>
      <main>
        <div className="container mx-auto px-4">
          <Producto />
          <ActuElimiProduc />
          <Usuarios />
          <ActuElimiUsua />

        </div>
      </main>
    </Layout>
  );
};

export default AdminPost;




  

  