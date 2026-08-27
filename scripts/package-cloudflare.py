import os
import zipfile
import sys

def make_posix_zip(source_dir, output_zip_path):
    print(f"Creating POSIX ZIP: {output_zip_path} from {source_dir}...")
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                abs_path = os.path.join(root, file)
                # Compute relative path and force POSIX forward slash
                rel_path = os.path.relpath(abs_path, source_dir).replace('\\', '/')
                zipf.write(abs_path, arcname=rel_path)
    size_mb = os.path.getsize(output_zip_path) / (1024 * 1024)
    print(f"[SUCCESS] {output_zip_path} ({size_mb:.2f} MB)")

def make_source_zip(root_dir, output_zip_path):
    print(f"Creating Source ZIP: {output_zip_path}...")
    exclude_dirs = {'.git', '.next', 'node_modules', 'out', '.vercel'}
    exclude_exts = {'.zip'}
    
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Prune excluded directories in-place
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                if any(file.endswith(ext) for ext in exclude_exts):
                    continue
                abs_path = os.path.join(root, file)
                rel_path = os.path.relpath(abs_path, root_dir).replace('\\', '/')
                zipf.write(abs_path, arcname=rel_path)
    size_mb = os.path.getsize(output_zip_path) / (1024 * 1024)
    print(f"[SUCCESS] {output_zip_path} ({size_mb:.2f} MB)")

if __name__ == '__main__':
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    out_dir = os.path.join(base_dir, 'out')
    
    if not os.path.exists(out_dir):
        print(f"Error: {out_dir} not found. Run 'npm run build' first.")
        sys.exit(1)
        
    cf_zip = os.path.join(base_dir, 'cloudflare-pages-deploy.zip')
    src_zip = os.path.join(base_dir, 'heer-kitchenware-source.zip')
    
    make_posix_zip(out_dir, cf_zip)
    make_source_zip(base_dir, src_zip)
